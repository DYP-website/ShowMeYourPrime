export type Profile = { id?: string; age:number; sex:'male'|'female'; height:number; startWeight:number; currentWeight:number; goalWeight:number; workoutsPerWeek:number; activity:'low'|'medium'|'high'; targetCalories:number; proteinTarget:number; carbTarget:number; fatTarget:number };
export type Meal = { id:string; date:string; name:string; kcal:number; protein:number; carbs:number; fat:number; mealType:string };
export type WeightEntry = { id:string; date:string; weight:number };
export type GymDay = { id:string; date:string; planned:boolean; done:boolean };
