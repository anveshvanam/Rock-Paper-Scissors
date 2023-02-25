import {Component} from 'react'

import './index.css'

import Popup from 'reactjs-popup'

import {RiCloseLine} from 'react-icons/ri'

import ChoiceItem from '../ChoiceItem'

import {
  Container,
  Heading,
  ScoreContainer,
  ChoicesList,
  Button1,
  ChoiceListContainer,
  RulesButton,
  RulesImage,
  PopupContainer,
  CloseButton,
  ResultContainer,
  Result,
  Image1,
  ResultItem,
  AppContainer,
  Para,
} from './styledComponents'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class Game extends Component {
  state = {
    count: 0,
    showResult: false,
    userElectedImage: '',
    randomImage: '',
  }

  componentDidMount() {
    this.getChoicesList()
  }

  startAgain = () => {
    this.setState({
      showResult: false,
      userElectedImage: '',
      randomImage: '',
      result: '',
    })
  }

  renderGetResult = () => {
    const {userElectedImage, randomImage, result} = this.state

    return (
      <ResultContainer>
        <ResultItem>
          <Heading>You</Heading>
          <Image1 src={userElectedImage} alt="your choice" />
        </ResultItem>

        <ResultItem>
          <Heading>Opponent</Heading>
          <Image1 src={randomImage} alt="opponent choice" />
        </ResultItem>
        <Result>
          <p>{result}</p>
          <Button1 onClick={this.startAgain} type="button">
            PLAY AGAIN
          </Button1>
        </Result>
      </ResultContainer>
    )
  }

  getResult = (id, imgUrl) => {
    const getRandomChoice = choicesList[Math.floor(Math.random() * 3)]

    let result
    if (id === 'PAPER' && getRandomChoice.id === 'ROCK') {
      result = 'YOU WON'
    } else if (id === 'SCISSORS' && getRandomChoice.id === 'ROCK') {
      result = 'YOU LOSE'
    } else if (id === 'ROCK' && getRandomChoice.id === 'PAPER') {
      result = 'YOU LOSE'
    } else if (id === 'SCISSORS' && getRandomChoice.id === 'PAPER') {
      result = 'YOU WON'
    } else if (id === 'ROCK' && getRandomChoice.id === 'SCISSORS') {
      result = 'YOU WON'
    } else if (id === 'PAPER' && getRandomChoice.id === 'SCISSORS') {
      result = 'YOU LOSE'
    } else {
      result = 'IT IS DRAW'
    }

    switch (result) {
      case 'YOU WON':
        this.setState(prevState => ({
          count: prevState.count + 1,
          showResult: true,
          userElectedImage: imgUrl,
          randomImage: getRandomChoice.imageUrl,
          result,
        }))
        break
      case 'YOU LOSE':
        this.setState(prevState => ({
          count: prevState.count - 1,
          showResult: true,
          userElectedImage: imgUrl,
          randomImage: getRandomChoice.imageUrl,
          result,
        }))
        break
      case 'IT IS DRAW':
        this.setState({
          showResult: true,
          userElectedImage: imgUrl,
          randomImage: getRandomChoice.imageUrl,
          result,
        })
        break
      default:
        break
    }
  }

  getChoicesList = () => (
    <ChoiceListContainer>
      <ChoicesList>
        {choicesList.map(item => (
          <ChoiceItem item={item} getResult={this.getResult} key={item.id} />
        ))}
      </ChoicesList>
      <Popup
        modal
        trigger={<RulesButton>RULES</RulesButton>}
        className="popup-container"
      >
        {close => (
          <PopupContainer>
            <CloseButton type="button" onClick={() => close()}>
              <RiCloseLine />
            </CloseButton>
            <RulesImage
              src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
              alt="rules"
            />
          </PopupContainer>
        )}
      </Popup>
    </ChoiceListContainer>
  )

  render() {
    const {count, showResult} = this.state
    return (
      <AppContainer>
        <Container>
          <div>
            <Heading>
              ROCK
              <br />
              PAPER
              <br />
              SCISSORS
            </Heading>
          </div>
          <div>
            <ScoreContainer>
              <Para>Score</Para>
              <Para>{count}</Para>
            </ScoreContainer>
          </div>
        </Container>
        {showResult ? this.renderGetResult() : this.getChoicesList()}
      </AppContainer>
    )
  }
}
export default Game
