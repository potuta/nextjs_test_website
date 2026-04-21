"use server"

import { db as prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

// GROUPS
export async function createGroup(title: string, userId: string) {
  await prisma.taskGroup.create({
    data: { title, userId }
  })

  revalidatePath("/todo")
}

export async function deleteGroup(groupId: number, userId: string) {
  await prisma.taskGroup.deleteMany({
    where: { id: groupId, userId }
  })

  revalidatePath("/todo")
}

export async function getGroups(userId: string){
    const groups = await prisma.taskGroup.findMany({
        where: { userId: userId },
        include: {
            tasks:{
                orderBy:{ createdAt: "asc" }
            }
        },
        orderBy: { createdAt: "desc" }
    });

    return groups
}

// TASKS
export async function createTask(task: string, groupId: number, userId: string) {
  await prisma.task.create({
    data: {
      task,
      taskGroupId: groupId,
      userId
    }
  })

  revalidatePath("/todo")
}

export async function toggleTask(taskId: number, isDone: boolean, userId: string) {
  await prisma.task.updateMany({
    where: { id: taskId, userId },
    data: { isDone }
  })

  revalidatePath("/todo")
}

export async function deleteTask(taskId: number, userId: string) {
  await prisma.task.deleteMany({
    where: { id: taskId, userId }
  })

  revalidatePath("/todo")
}

export async function toggleAllTasks(groupId: number, value: boolean, userId: string) {
  await prisma.task.updateMany({
    where: { taskGroupId: groupId, userId },
    data: { isDone: value }
  })

  revalidatePath("/todo")
}