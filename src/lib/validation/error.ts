import { TRPCClientError } from '@trpc/client';
import { CartRouter } from '~/server/api/routers/cartRouter';

export function isTRPCClientError(
    cause: unknown
  ): cause is TRPCClientError<typeof CartRouter> {
    return cause instanceof TRPCClientError;
  }