const maladeReducer = (state = [], action) => {
    switch(action.type)
    {
        case "AJOUT_MALADE":
            return [
                ...state,
                {
                  x: action.data,
                }
              ]            
        case "UPDATE_MALADE":
            return [
                ...state,
                {
                  x: action.data,
                }
              ]  
        case "DELETE_MALADE":
            return [
                ...state,
                {
                  x: action.id,
                }
              ]  
        default: return state;
    }
};

export default maladeReducer;