const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            // console.log("LOGIN action payload:", action.payload);
            return {
                currentUser: action.payload, // Store the entire payload
                isSessionExpired: false,
            };
        }
        case "LOGOUT": {
            localStorage.removeItem("user");
            return {
                currentUser: null,
                isSessionExpired: action.isSessionExpired || false,
            };
        }
        default:
            return state;
    }
};

export default AuthReducer;
