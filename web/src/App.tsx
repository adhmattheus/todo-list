import './App.css'
import { TodoList } from "./components/TodoList"
import { Container } from './styles/Container'


function App() {
  return (
    <Container>
      <h1>To-Do list</h1>
      <TodoList />
    </Container>

  )
}

export default App
