import api from "../../api/malades";


export const ajouterMalade =  (data) => {

    return async (dispatch, getState) => {
        const request = {
            ...data
        };
        await api.post("/malades", request)
        dispatch({
            type: 'AJOUT_MALADE',
            data
        })
    }
}

export const effacerMalade =  (id) => {

    return async (dispatch, getState) => {
        await api.delete(`/malades/${id}`);
        dispatch({
            type: 'DELETE_MALADE',
            id
        })
    }
}

export const mettreAjourMalade =  (data) => {

    return async (dispatch, getState) => {
        await api.put(`/malades/${data.id}`, data);
        dispatch({
            type: 'UPDATE_MALADE',
            data
        })
    }
}



