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

export function TodoClient({
  groups,
  user
}: {
  groups: Group[]
  user: { id: string; username?: string }
}) {
  const [open, setOpen] = useState<Record<number, boolean>>({})
  const [groupInput, setGroupInput] = useState("")
  const [taskInput, setTaskInput] = useState<Record<number, string>>({})
  const [isCreating, setIsCreating] = useState(false);
  const [isCreatingTask, setIsCreatingTask] = useState<number | null>(null);
  const [loadingGroupId, setLoadingGroupId] = useState<number | null>(null);
  const [loadingTaskId, setLoadingTaskId] = useState<number | null>(null);
  const [isDeletingId, setIsDeletingId] = useState<number | null>(null);
  const [isDeletingTaskId, setIsDeletingTaskId] = useState<number | null>(null);

  // ---------------------------
  // Helpers
  // ---------------------------

  const isAllChecked = (tasks: Task[]) =>
    tasks.length > 0 && tasks.every(t => t.isDone)

  const getProgress = (tasks: Task[]) => {
    if (tasks.length === 0) return 0
    const done = tasks.filter(t => t.isDone).length
    return Math.round((done / tasks.length) * 100)
  }

  // ---------------------------
  // Handlers
  // ---------------------------

  const handleToggleGroup = (id: number) => {
    setOpen(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleCreateGroup = async () => {
    if (!groupInput.trim()) return

    try{
      setIsCreating(true);
      await createGroup(groupInput, user.id)
      setGroupInput("")
    }
    finally{
      setIsCreating(false);
    }
  }

  const handleCreateTask = async (groupId: number) => {
    const text = taskInput[groupId]
    if (!text?.trim()) return

    try{
      setIsCreatingTask(groupId);
      await createTask(text, groupId, user.id)
      setTaskInput(prev => ({
        ...prev,
        [groupId]: ""
      }))
    }
    finally{
      setIsCreatingTask(null);
    }
  }

  const handleToggleTask = async (taskId: number, value: boolean) => {
    try{
      setLoadingTaskId(taskId);
      await toggleTask(taskId, value, user.id)
    }
    finally{
      setLoadingTaskId(null);
    }
  }

  const handleToggleAll = async (group: Group, value: boolean) => {
    try{
      setLoadingGroupId(group.id);
      await toggleAllTasks(group.id, value, user.id)
    }
    finally{
      setLoadingGroupId(null);
    }
  }

  const handleDeleteTask = async (taskId: number) => {
    try{
      setIsDeletingTaskId(taskId);
      await deleteTask(taskId, user.id)
    }
    finally{
      setIsDeletingTaskId(null);
    }
  }

  const handleDeleteGroup = async (groupId: number) => {
    try{
      setIsDeletingId(groupId);
      await deleteGroup(groupId, user.id)
    }
    finally{
      setIsDeletingId(null);
    }
  }

  // ---------------------------
  // UI
  // ---------------------------

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg space-y-4">

        <Card>
          <CardContent className="p-4 space-y-4">

            <h1 className="text-xl font-bold text-center">
              {user.username} Tasks
            </h1>

            {/* Create Group */}
            <div className="flex gap-2">
              <Input
                placeholder="Add a group..."
                value={groupInput}
                onChange={(e) => setGroupInput(e.target.value)}
                disabled={isCreating}
              />
              <Button size="icon" onClick={handleCreateGroup} disabled={isCreating}>
                {isCreating ? (
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Plus size={16} />
                )}
              </Button>
            </div>

            {/* Groups */}
            {groups.map(group => (
              <div key={group.id} className="border rounded-lg p-2">

                {/* Header */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">

                    {/* <Checkbox
                      checked={isAllChecked(group.tasks)}
                      onCheckedChange={(val) => {
                        if (typeof val === "boolean") {
                          handleToggleAll(group, val)
                        }
                      }}
                    /> */}

                    {loadingGroupId === group.id ? (
                      <div className="h-4 w-4 border-2 border-muted border-t-primary rounded-full animate-spin" />
                    ) : (
                      <Checkbox
                        checked={isAllChecked(group.tasks)}
                        onCheckedChange={(val) => {
                          if (typeof val === "boolean") {
                            handleToggleAll(group, val);
                          }
                        }}
                      />
                    )}

                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => handleToggleGroup(group.id)}
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

                    {isDeletingId === group.id ? (
                      <div className="h-4 w-4 border-2 border-muted border-t-destructive rounded-full animate-spin" />
                    ): (
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDeleteGroup(group.id)}
                        disabled={isDeletingId === group.id}
                      >
                        <Trash size={16} />
                      </Button>
                    )}
                  </div>
                </div>

                <Progress value={getProgress(group.tasks)} className="h-1.5 mt-2 mb-2"/>

                {/* Tasks */}
                {open[group.id] && (
                  <div className="mt-3 space-y-2">

                    {/* Add Task */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add task..."
                        value={taskInput[group.id] || ""}
                        onChange={(e) =>
                          setTaskInput(prev => ({
                            ...prev,
                            [group.id]: e.target.value
                          }))
                        }
                        disabled={isCreatingTask === group.id}
                      />
                      <Button
                        size="icon"
                        onClick={() => handleCreateTask(group.id)}
                        disabled={isCreatingTask === group.id}
                      >
                        {isCreatingTask === group.id ? (
                          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Plus size={16} />
                        )}
                      </Button>
                    </div>

                    {/* Task List */}
                    {group.tasks.map(task => (
                      <div key={task.id} className="flex justify-between">

                        <div className="flex items-center gap-2">
                          {/* <Checkbox
                            checked={task.isDone}
                            onCheckedChange={(val) => {
                              if (typeof val === "boolean") {
                                handleToggleTask(task.id, val)
                              }
                            }}
                          /> */}

                          {loadingTaskId === task.id ? (
                            <div className="h-4 w-4 border-2 border-muted border-t-primary rounded-full animate-spin" />
                          ) : (
                            <Checkbox
                              checked={task.isDone}
                              onCheckedChange={(val) => {
                                if (typeof val === "boolean") {
                                  handleToggleTask(task.id, val)
                                }
                              }}
                            />
                          )}

                          <span className={task.isDone ? "line-through text-gray-500" : ""}>
                            {task.task}
                          </span>
                        </div>


                        {isDeletingTaskId === task.id ? (
                          <div className="h-4 w-4 border-2 border-muted border-t-destructive rounded-full animate-spin" />
                        ) : (
                          <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => handleDeleteTask(task.id)}
                            disabled={isDeletingTaskId === task.id}
                          >
                            <Trash size={16} />
                          </Button>
                        )}
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