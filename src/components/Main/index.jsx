import React, { Component } from 'react'
import uuid from 'uuid'
import MessageList from '../MessageList'
import InputText from '../InputText'
import ProfileBar from '../ProfileBar'

class Main extends Component {
  constructor (){
    super()

    this.state = {
      openText: false,
      messages: [
        {
          id: uuid.v4(),
          text: 'Mensaje del Tweet',
          picture: 'https://pbs.twimg.com/profile_images/1014574035995381760/xxA7qmVp_bigger.jpg',
          displayName: 'Samuel Cusi',
          username: 'samurRC',
          date: Date.now()-180000,
          retweets: 0,
          favorites: 0
        },
        {
          id: uuid.v4(),
          text: 'Este es un nuevo mensaje',
          picture: 'https://pbs.twimg.com/profile_images/1014574035995381760/xxA7qmVp_bigger.jpg',
          displayName: 'Samuel Cusi',
          username: 'samurRC',
          date: Date.now()-1800000,
          retweets: 0,
          favorites: 0
        }
      ]
    }

    this.handleSendText = this.handleSendText.bind(this)
    this.handleCloseText = this.handleCloseText.bind(this)
    this.handleOpenText = this.handleOpenText.bind(this)
  }

  handleSendText(event){
    event.preventDefault()
    let newMessage = {
      id: uuid.v4(),
      username: this.props.user.email.split('@')[0],
      displayName: this.props.user.displayName,
      picture: this.props.user.photoURL,
      date: Date.now(),
      text: event.target.text.value
    }
    this.setState({
      messages: this.state.messages.concat([newMessage]),
      openText: false
    })
    console.log(newMessage);
  }

  handleCloseText(event){
    event.preventDefault()
    this.setState({ openText: false})
  }

  handleOpenText (event){
    event.preventDefault()
    this.setState({ openText: true})
  }

  handleRetweet(msgId){
    let alreadyRetweeted = this.state.user.retweets.filter(rt => rt === msgId)
    if(alreadyRetweeted.length===0){
      let messages = this.state.messages.map(msg => {
        if(msg.id === msgId){
          msg.retweets++
        }
        return msg
      })
    }
  }

  handleFavorite(msgId){
    let alreadyFavorited = this.stage.user.favorites.filter(fav => fav === msgId)
    if(alreyFavorited.length===0){
      let messages = this.state.messages.map(msg=>{
        if(msg.id === msgId){
          msg.favorites++
        }
        return msg
      })

      let user = Object.assign({}, this.state.user)
      user.favorites.push(msgId)

      this.setState({
        messages,
        user
      })
    }
  }

  renderOpenText(){
    if(this.state.openText){
      return (
        <InputText
          onSendText={this.handleSendText}
          onCloseText={this.handleCloseText}
        />
      )
    }
  }

  render () {
    return (
      <div>
        <ProfileBar
          picture={this.props.user.photoURL}
          username={this.props.user.email.split('@')[0]}
          onOpenText={this.handleOpenText}
        />
        { this.renderOpenText()}

        <MessageList
          messages={this.state.messages}
          onRetweet={this.handleRetweet}
          onFavorite={this.handleFavorite}
        />
      </div>
    )
  }
}

export default Main