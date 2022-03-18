import React, { Component, createContext } from 'react';

export const AppContext = createContext();

export class AppProvider extends Component {

    state = {
        email: '',
        avatar: '',
        id_user: '',
        name: '',
    }

    addUser = (user) =>{
        this.setState({avatar: user.avatar})
        this.setState({id_user: user.id})
        this.setState({name: user.name})
    };

    signOut = () => {
        this.setState({avatar: ''})
        this.setState({id_user: ''})
        this.setState({name: ''})
    }

    componentDidUpdate(){
        localStorage.setItem('datAvatar', JSON.stringify(this.state.avatar))
        localStorage.setItem('dataName', JSON.stringify(this.state.name))
        localStorage.setItem('dataUser', JSON.stringify(this.state.id_user))
    };

    componentDidMount(){
        const datAvatar = JSON.parse(localStorage.getItem('datAvatar'));
        if(datAvatar !== null){
            this.setState({avatar: datAvatar});
        }
        const dataName = JSON.parse(localStorage.getItem('dataName'));
        if(dataName !== null){
            this.setState({name: dataName});
        }
        const dataUser = JSON.parse(localStorage.getItem('dataUser'));
        if(dataUser !== null){
            this.setState({id_user: dataUser});
        }
    };

    render() {
        const {email, avatar, id_user, name} = this.state;
        const {addUser ,signOut} = this;
        return (
            <AppContext.Provider 
            value={{email, avatar, id_user, name, addUser , signOut}}>
                {this.props.children}
            </AppContext.Provider>
        )
    }


};

