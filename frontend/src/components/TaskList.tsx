import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
}

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (taskId: string) => void;
}

export function TaskList({ tasks, onDeleteTask }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-zinc-500">No tasks yet. Create one to get started!</p>;
  }

  const handleDelete = async (taskId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/tasks/${taskId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        onDeleteTask(taskId);
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{task.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {task.description && <p className="text-zinc-600">{task.description}</p>}
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800">
                {task.status}
              </span>
            </div>
          </CardContent>
          <CardFooter className="pt-0 flex justify-end">
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => handleDelete(task.id)}
              className="text-xs"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
