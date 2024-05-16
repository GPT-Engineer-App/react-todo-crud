import { useState } from "react";
import { Container, VStack, HStack, Input, Button, IconButton, Text, Box } from "@chakra-ui/react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Hero from "../components/Hero";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, inputValue]);
      setInputValue("");
    }
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const startEditTodo = (index) => {
    setEditIndex(index);
    setEditValue(todos[index]);
  };

  const saveEditTodo = () => {
    const updatedTodos = todos.map((todo, index) => (index === editIndex ? editValue : todo));
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input placeholder="Add a new todo" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <Button onClick={addTodo} colorScheme="teal">
            Add
          </Button>
        </HStack>
        <VStack spacing={2} width="100%">
          {todos.map((todo, index) => (
            <HStack key={index} width="100%" justifyContent="space-between">
              {editIndex === index ? (
                <>
                  <Input value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                  <IconButton aria-label="Save" icon={<FaCheck />} onClick={saveEditTodo} colorScheme="green" />
                </>
              ) : (
                <>
                  <Text>{todo}</Text>
                  <HStack>
                    <IconButton aria-label="Edit" icon={<FaEdit />} onClick={() => startEditTodo(index)} colorScheme="yellow" />
                    <IconButton aria-label="Delete" icon={<FaTrash />} onClick={() => deleteTodo(index)} colorScheme="red" />
                  </HStack>
                </>
              )}
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
