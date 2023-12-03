import { COGNITO_JWT_PAYLOAD_CONTEXT_PROPERTY } from '@nestjs-cognito/auth';

export const defaultSubClaimName = 'sub';
export function getSub(request: any) {
  return getClaim(request, defaultSubClaimName);
}

export function getClaim(request: any, claimKey: string) {
  const payload = getAuthCtx(request);
  return payload[`cognito:${claimKey}`] || payload[claimKey];
}

export function getAuthCtx(request: any) {
  return request[COGNITO_JWT_PAYLOAD_CONTEXT_PROPERTY];
}

export function setAuthCtxProperty(request: any, property: any): void {
  request[COGNITO_JWT_PAYLOAD_CONTEXT_PROPERTY] = property;
}
