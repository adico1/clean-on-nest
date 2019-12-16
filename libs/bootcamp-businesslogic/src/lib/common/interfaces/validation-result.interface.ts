export abstract class IValidationResult {
  abstract get isValid(): boolean;
  abstract set isValid(valiue: boolean);
  abstract get errors(): string[];
}
