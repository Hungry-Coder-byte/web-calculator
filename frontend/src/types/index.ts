export interface CalculationRequest {
  expression: string;
}

export interface CalculationResponse {
  result: number;
}

export interface HistoryItem {
  expression: string;
  result: number;
  createdAt: Date;
}

export interface HistoryResponse {
  history: HistoryItem[];
}