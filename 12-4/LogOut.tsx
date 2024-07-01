

  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUser: (state, action) => {
            state.email = action.payload.email;
            state.id = action.payload.id
        },
        removeUser:(state) => {
            state.email = '';
            state.id = '';
        }
    }
})

const handleSignOut = () => {
    signOut(auth)
    .then(()=>{
      dispatch(
        removeUser()
      )
    })
    .catch((error) => {
      console.log(error);
    })
  }

  <FiLogOut className={addButton} onClick={handleSignOut}/>
