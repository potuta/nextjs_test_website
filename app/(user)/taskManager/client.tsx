"use client"

import { useState } from "react"
import {
  createGroup,
  deleteGroup,
  createTask,
  toggleTask,
  deleteTask,
  toggleAllTasks
} from "./actions"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, ChevronRight, Plus, Trash } from "lucide-react"
import { Progress } from "@/components/ui/progress"

type Task = {
  id: number
  task: string
  isDone: boolean
}

type Group = {
  id: number
  title: string
  tasks: Task[]
}

export function TodoClient({ groups, user }: Readonly<{ groups: Group[], user: { id: string; username?: string }}>) {
  const [open, setOpen] = useState<{ [key: number]: boolean }>({})
  const [groupInput, setGroupInput] = useState("")
  const [taskInput, setTaskInput] = useState<{ [key: number]: string }>({})
  const isIndeterminate = (tasks: Task[]) =>
    tasks.some(t => t.isDone) && !tasks.every(t => t.isDone)

  const toggleGroup = (id: number) => {
    setOpen(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const getProgress = (tasks: Task[]) => {
    if (!tasks.length) return 0
    return Math.round(
      (tasks.filter(t => t.isDone).length / tasks.length) * 100
    )
  }

  const isAllChecked = (tasks: Task[]) =>
    tasks.length > 0 && tasks.every(t => t.isDone)

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md space-y-4">

        <Card>
          <CardContent className="p-4 space-y-4">

            <h1 className="text-xl font-bold text-center">
              {user.username} Tasks
            </h1>

            {/* CREATE GROUP */}
            <div className="flex gap-2">
              <Input
                placeholder="Add a group..."
                value={groupInput}
                onChange={(e) => setGroupInput(e.target.value)}
              />
              <Button
                size="icon"
                onClick={async () => {
                  if (!groupInput.trim()) return
                  await createGroup(groupInput, user.id)
                  setGroupInput("")
                }}
              >
                <Plus size={16} />
              </Button>
            </div>

            {/* GROUPS */}
            {groups.map((group) => (
              <div key={group.id} className="border rounded-lg p-2">

                {/* HEADER */}
                <div className="flex justify-between items-center">

                  <div className="flex items-center gap-2">
                   <Checkbox
                      checked={isAllChecked(group.tasks)}
                      onCheckedChange={(val) => {
                        if (typeof val === "boolean") {
                          toggleAllTasks(group.id, val, user.id)
                        }
                      }}
                    />

                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => toggleGroup(group.id)}
                    >
                      {open[group.id]
                        ? <ChevronDown size={16} />
                        : <ChevronRight size={16} />
                      }
                      <span className="font-semibold">{group.title}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>{getProgress(group.tasks)}%</span>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => deleteGroup(group.id, user.id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </div>

                <Progress value={getProgress(group.tasks)} />

                {/* TASKS */}
                {open[group.id] && (
                  <div className="mt-3 space-y-2">

                    {/* ADD TASK */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add task..."
                        value={taskInput[group.id] || ""}
                        onChange={(e) =>
                          setTaskInput({
                            ...taskInput,
                            [group.id]: e.target.value
                          })
                        }
                      />

                      <Button
                        size="icon"
                        onClick={async () => {
                          const text = taskInput[group.id]
                          if (!text?.trim()) return

                          await createTask(text, group.id, user.id)

                          setTaskInput({
                            ...taskInput,
                            [group.id]: ""
                          })
                        }}
                      >
                        <Plus size={16} />
                      </Button>
                    </div>

                    {/* TASKS */}
                    {(group.tasks ?? []).map((task) => (
                      <div key={task.id} className="flex justify-between">

                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={task.isDone}
                            onCheckedChange={(val) => {
                              if (typeof val === "boolean") {
                                toggleTask(task.id, val, user.id)
                              }
                            }}
                          />

                          <span className={task.isDone ? "line-through text-gray-500" : ""}>
                            {task.task}
                          </span>
                        </div>

                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => deleteTask(task.id, user.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    ))}

                  </div>
                )}

              </div>
            ))}

          </CardContent>
        </Card>

      </div>
    </div>
  )
}