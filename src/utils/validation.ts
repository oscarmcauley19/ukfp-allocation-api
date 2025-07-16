import { Request, Response } from "express";
import { ZodSchema } from "zod";

export type ValidationResult = {
  code: number;
  json: Record<string, unknown>;
};

export const validatePostRequest = (
  req: Request,
  res: Response,
  zodSchema: ZodSchema,
): ValidationResult | null => {
  if (!req.body) {
    return {
      code: 400,
      json: { error: "Invalid request" },
    };
  }

  const parseResult = zodSchema.safeParse(req.body);
  if (!parseResult.success) {
    return {
      code: 400,
      json: { error: "Invalid request", details: parseResult.error.errors },
    };
  }

  return null;
};
