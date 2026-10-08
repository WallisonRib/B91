-- CreateEnum
CREATE TYPE "RiskLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "riskLevel" "RiskLevel" NOT NULL DEFAULT 'LOW';
