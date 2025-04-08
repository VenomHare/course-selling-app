/*
  Warnings:

  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `courseId` on the `Course` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CoursePurchased" DROP CONSTRAINT "CoursePurchased_courseId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP CONSTRAINT "Course_pkey",
DROP COLUMN "courseId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "CoursePurchased" ADD CONSTRAINT "CoursePurchased_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
