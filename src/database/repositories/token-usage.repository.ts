export interface TokenUsageRecord {
  userId: string;
  total_tokens: number;
}

export interface TokenUsageRepository {
  incrementTokens(userId: string, tokens: number): Promise<TokenUsageRecord>;
}
