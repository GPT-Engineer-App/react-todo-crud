import { useState } from "react";
import { Container, VStack, HStack, Input, Button, IconButton, Text, Box, Select } from "@chakra-ui/react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Hero from "../components/Hero";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState({ text: "", urgency: "tba" });
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState({ text: "", urgency: "tba" });

  const addTodo = () => {
    if (inputValue.text.trim() !== "") {
      setTodos([...todos, inputValue]);
      setInputValue({ text: "", urgency: "tba" });
    }
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const startEditTodo = (index) => {
    setEditIndex(index);
    setEditValue({ text: todos[index].text, urgency: todos[index].urgency });
  };

  const saveEditTodo = () => {
    const updatedTodos = todos.map((todo, index) => (index === editIndex ? { text: editValue.text, urgency: editValue.urgency } : todo));
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditValue("");
  };

  const urgencyOrder = { tba: 0, "not urgent": 1, "1 week": 2, "1 day": 3, "very urgent": 4 };
  const sortedTodos = [...todos].sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency]);

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input placeholder="Add a new todo" value={inputValue.text} onChange={(e) => setInputValue({ ...inputValue, text: e.target.value })} />
          <Select value={inputValue.urgency} onChange={(e) => setInputValue({ ...inputValue, urgency: e.target.value })}>
            <option value="tba">TBA</option>
            <option value="not urgent">Not Urgent</option>
            <option value="1 week">1 Week</option>
            <option value="1 day">1 Day</option>
            <option value="very urgent">Very Urgent</option>
          </Select>
          <Button onClick={addTodo} colorScheme="teal">
            Add
          </Button>
        </HStack>
        <VStack spacing={2} width="100%">
          {sortedTodos.map((todo, index) => (
            <HStack key={index} width="100%" justifyContent="space-between">
              {editIndex === index ? (
                <>
                  <Input value={editValue.text} onChange={(e) => setEditValue({ ...editValue, text: e.target.value })} />
                  <Select value={editValue.urgency} onChange={(e) => setEditValue({ ...editValue, urgency: e.target.value })}>
                    <option value="tba">TBA</option>
                    <option value="not urgent">Not Urgent</option>
                    <option value="1 week">1 Week</option>
                    <option value="1 day">1 Day</option>
                    <option value="very urgent">Very Urgent</option>
                  </Select>
                  <IconButton aria-label="Save" icon={<FaCheck />} onClick={saveEditTodo} colorScheme="green" />
                </>
              ) : (
                <>
                  <Text>
                    {todo.text} - {todo.urgency}
                  </Text>
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
