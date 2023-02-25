import {GameItem, ItemImage, ItemButton} from './styledComponents'

const ChoiceItem = props => {
  const {item, getResult} = props
  const {id, imageUrl} = item

  const onClickChoiceItem = () => {
    getResult(id, imageUrl)
  }
  const testId = `${id.toLowerCase()}Button`

  return (
    <GameItem>
      <ItemButton onClick={onClickChoiceItem} data-testid={testId}>
        <ItemImage src={imageUrl} alt={id} />
      </ItemButton>
    </GameItem>
  )
}

export default ChoiceItem
