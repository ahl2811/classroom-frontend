import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { GRADE_STRUCTURE } from "../../common/constants";
import { IErrorResponse } from "../../common/types";
import DisplayByStatus from "../../components/DisplayByStatus";
import Header from "../../components/header";
import { IconButtonStyle } from "../../components/style";
import {
  deleteGradeStructure,
  getGradeStructures,
  IGradeStructure,
  updateGradeOrder,
} from "./api";
import ModalAddGrade from "./components/ModalAddGrade";
import ModalUpdateGrade from "./components/ModalUpdateGrade";
import { GradeStructurePageStyle } from "./style";

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  padding: `8px 12px`,
  margin: `20px 0px`,
  background: isDragging ? "teal" : "white",
  color: isDragging ? "white" : "teal",
  border: `1px solid #ddd`,
  fontSize: `20px`,
  borderRadius: `8px`,
  ...draggableStyle,
});

const GradeStructurePage = () => {
  const [grades, setGrades] = useState<IGradeStructure[]>([]);
  const { id: roomId } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { isLoading, error } = useQuery<IGradeStructure[], IErrorResponse>(
    [GRADE_STRUCTURE.GET, roomId],
    () => getGradeStructures(roomId),
    {
      onSuccess: (data) => {
        setGrades(data);
      },
    }
  );

  const { mutateAsync: updateAsync } = useMutation(
    "update-grade-order",
    updateGradeOrder
  );

  const { isLoading: isDeleting, mutateAsync: deleteAsync } = useMutation(
    "delete-grade-structure",
    deleteGradeStructure,
    {
      onMutate: (data) => {
        console.log("muta", data);
        const oldData = queryClient.getQueryData<IGradeStructure[]>([
          GRADE_STRUCTURE.GET,
          roomId,
        ]);
        if (oldData) {
          const index = oldData.findIndex((item) => item.id === data.gradeId);
          const newData = [...oldData];
          newData.splice(index, 1);
          queryClient.setQueryData([GRADE_STRUCTURE.GET, roomId], newData);
        }
        return { oldData };
      },
      onError: (err, variables, context) => {
        const ct = context as any;
        if (ct?.oldData) {
          queryClient.setQueryData(
            [GRADE_STRUCTURE.GET, roomId],
            ct.oldData as IGradeStructure[]
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries([GRADE_STRUCTURE.GET, roomId]);
      },
    }
  );

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (destination.index === source.index) return;

    //call api
    const gradeSource: IGradeStructure = { ...grades[source.index] };
    const gradeId = gradeSource.id;
    updateAsync({ roomId: roomId, gradeId, order: destination.index + 1 });

    //update state
    const items = Array.from(grades);

    const [newOrder] = items.splice(source.index, 1);
    items.splice(destination.index, 0, newOrder);

    queryClient.setQueryData([GRADE_STRUCTURE.GET, roomId], items);
    setGrades(items);
  };

  const handleDelete = (data: { roomId: string; gradeId: string }) => {
    deleteAsync(data);
  };

  if (isLoading || error) {
    return (
      <>
        <Header />
        {DisplayByStatus({ error, isLoading })}
      </>
    );
  }

  return (
    <>
      <Header />
      <GradeStructurePageStyle>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="page-container">
            <div className="d-flex flex-row justify-content-between border-bottom pb-2">
              <h2 className="text-secondary">Grade Structure</h2>
              <ModalAddGrade roomId={roomId} />
            </div>
            <Droppable droppableId="grades">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="task-list"
                >
                  {grades.length > 0 ? (
                    grades.map(({ id, name, grade }, index) => {
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                              className="shadow-sm"
                            >
                              <div className="d-flex flex-row justify-content-between align-items-end">
                                <h5>{name}</h5>
                                <ModalUpdateGrade
                                  roomId={roomId}
                                  gradeName={name}
                                  gradePoints={grade}
                                  gradeId={id}
                                />
                                <IconButtonStyle
                                  disabled={isDeleting}
                                  onClick={() =>
                                    handleDelete({ roomId, gradeId: id })
                                  }
                                >
                                  <i
                                    className="bi bi-trash text-black"
                                    style={{ fontSize: 20 }}
                                  />
                                </IconButtonStyle>
                              </div>
                              {grade}
                            </div>
                          )}
                        </Draggable>
                      );
                    })
                  ) : (
                    <div className="text-secondary text-center pt-4">
                      Grade structure is empty!
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </GradeStructurePageStyle>
    </>
  );
};

export default GradeStructurePage;
