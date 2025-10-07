import { z } from 'zod';

/**
 * Validates a single item against a Zod schema
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @param itemName - Name of the item being validated (for error reporting)
 * @returns Validation result with parsed data or error details
 */
export function validateItem<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  itemName: string
): { success: true; data: T } | { success: false; errors: string[] } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors = result.error.issues.map((issue: any) =>
    `${issue.path.join('.')}: ${issue.message}`
  );

  return { success: false, errors };
}

/**
 * Validates a single item and throws an error if validation fails
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @param itemName - Name of the item being validated (for error reporting)
 * @returns Validated data
 */
export function validateOrThrow<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  itemName: string
): T {
  const result = validateItem(schema, data, itemName);

  if (!result.success) {
    const errorMessage = result.errors
      .map(error => `  - ${error}`)
      .join('\n');
    throw new Error(`${itemName} validation failed:\n${errorMessage}`);
  }

  return result.data;
}
