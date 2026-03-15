/**
 * 여행지 추천 요청 DTO
 */

import { IsString, IsIn, IsNumber, IsDateString, Min, Max } from 'class-validator';

export class RecommendDestinationsDto {
  @IsString()
  @IsIn(['active', 'relaxed'])
  travelStyle: 'active' | 'relaxed';

  @IsString()
  @IsIn(['nature', 'city'])
  environment: 'nature' | 'city';

  @IsNumber()
  @Min(1)
  @Max(14)
  duration: number;

  @IsString()
  @IsIn(['solo', 'couple', 'family', 'friends'])
  companionType: 'solo' | 'couple' | 'family' | 'friends';

  @IsDateString()
  startDate: string;
}
