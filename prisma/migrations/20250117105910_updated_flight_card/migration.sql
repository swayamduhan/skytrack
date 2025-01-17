/*
  Warnings:

  - You are about to drop the column `fromTime` on the `flightCard` table. All the data in the column will be lost.
  - You are about to drop the column `toTime` on the `flightCard` table. All the data in the column will be lost.
  - Added the required column `beginTime` to the `flightCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureDate` to the `flightCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `flightCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "flightCard" DROP COLUMN "fromTime",
DROP COLUMN "toTime",
ADD COLUMN     "beginTime" TEXT NOT NULL,
ADD COLUMN     "departureDate" TEXT NOT NULL,
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "notify" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "threshold" DROP NOT NULL;
