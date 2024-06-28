
const [activeBoardId, setActiveBoardId] = useState('board-0')
const getActiveBoard = boards.filter(board => board.boardId === activeBoardId)[0];
const boards = useTypedSelector(state => state.boards.boardArray);


const handleDeleteBoard = () => {
    if(boards.length > 1) {
      dispatch(
        deleteBoard({boardId: getActiveBoard.boardId})
      )

      dispatch(
        addLog({
          logId: v4(),
          logMessage:`게시판 지우기: ${getActiveBoard.boardName}`,
          logAuthor: "User",
          logTimestamp: String(Date.now())
        })
      )

      const newIndexToSet = () => {
        const indexToBeDeleted = boards.findIndex(
          board => board.boardId === activeBoardId
        )

        return indexToBeDeleted === 0 
        ? indexToBeDeleted + 1
        : indexToBeDeleted -1;
      }

      setActiveBoardId(boards[newIndexToSet()].boardId);


    } else {
      alert('최소 게시판 개수는 한 개입니다.')
    }
  }