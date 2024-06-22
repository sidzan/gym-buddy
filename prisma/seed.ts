import { PrismaClient, MuscleGroup } from "@prisma/client";

const prisma = new PrismaClient();

const exercises = [
  {
    code: "SQ",
    name: "Squat",
    primaryMuscleGroup: [MuscleGroup.QUADRICEPS],
    secondaryMuscleGroup: [MuscleGroup.GLUTES],
    isCompound: true,
  },
  {
    code: "DL",
    name: "Deadlift",
    primaryMuscleGroup: [MuscleGroup.HAMSTRINGS],
    secondaryMuscleGroup: [MuscleGroup.BACK],
    isCompound: true,
  },
  {
    code: "BP",
    name: "Bench Press",
    primaryMuscleGroup: [MuscleGroup.CHEST],
    secondaryMuscleGroup: [MuscleGroup.TRICEPS],
    isCompound: true,
  },
  {
    code: "PU",
    name: "Pull-Up",
    primaryMuscleGroup: [MuscleGroup.BACK],
    secondaryMuscleGroup: [MuscleGroup.BICEPS],
    isCompound: true,
  },
  {
    code: "BR",
    name: "Barbell Row",
    primaryMuscleGroup: [MuscleGroup.BACK],
    secondaryMuscleGroup: [MuscleGroup.BICEPS],
    isCompound: true,
  },
  {
    code: "OHP",
    name: "Overhead Press",
    primaryMuscleGroup: [MuscleGroup.SHOULDERS],
    secondaryMuscleGroup: [MuscleGroup.TRICEPS],
    isCompound: true,
  },
  {
    code: "BC",
    name: "Bicep Curl",
    primaryMuscleGroup: [MuscleGroup.BICEPS],
    secondaryMuscleGroup: [MuscleGroup.FOREARMS],
    isCompound: false,
  },
  {
    code: "TD",
    name: "Tricep Dip",
    primaryMuscleGroup: [MuscleGroup.TRICEPS],
    secondaryMuscleGroup: [MuscleGroup.CHEST],
    isCompound: false,
  },
  {
    code: "LP",
    name: "Leg Press",
    primaryMuscleGroup: [MuscleGroup.QUADRICEPS],
    secondaryMuscleGroup: [MuscleGroup.GLUTES],
    isCompound: false,
  },
  {
    code: "LR",
    name: "Lateral Raise",
    primaryMuscleGroup: [MuscleGroup.SHOULDERS],
    secondaryMuscleGroup: [MuscleGroup.TRAPS],
    isCompound: false,
  },
  {
    code: "CF",
    name: "Chest Fly",
    primaryMuscleGroup: [MuscleGroup.CHEST],
    secondaryMuscleGroup: [MuscleGroup.SHOULDERS],
    isCompound: false,
  },
  {
    code: "LC",
    name: "Leg Curl",
    primaryMuscleGroup: [MuscleGroup.HAMSTRINGS],
    secondaryMuscleGroup: [MuscleGroup.CALVES],
    isCompound: false,
  },
];

async function main() {
  for (const exercise of exercises) {
    await prisma.exercises.create({
      data: exercise,
    });
  }
}

main()
  .then(() => {
    console.log("Seeding finished.");
  })
  .catch((e) => {
    console.error("Seeding error:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
