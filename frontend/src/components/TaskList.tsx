import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
}

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-zinc-500">No tasks yet. Create one to get started!</p>;
  }

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
        </Card>
      ))}
    </div>
  );
}
