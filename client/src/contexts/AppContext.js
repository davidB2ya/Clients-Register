import React, { Component, createContext } from 'react';

export const AppContext = createContext();

export class AppProvider extends Component {

    state = {
        email: '',
        avatar: '',
        id_user: '',
    }

    addUser = (user) =>{
        this.setState({avatar: user.avatar})
        this.setState({id_user: user.id})
    };

    signOut = () => {
        this.setState({avatar: ''})
        this.setState({id_user: ''})
    }

    render() {
        const {email, avatar, id_user} = this.state;
        const {addUser ,signOut} = this;
        return (
            <AppContext.Provider 
            value={{email, avatar, id_user, addUser , signOut}}>
                {this.props.children}
            </AppContext.Provider>
        )
    }


};

