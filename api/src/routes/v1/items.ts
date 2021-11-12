import { Router } from 'express';
import { verifyJwtMiddleware } from '@middleware/verify-jwt.middleware';

const ItemRouter = Router();

export const NFT_ITEM_ROUTE_BASE_PATH = '/nft-items';

ItemRouter.patch(
  '/:nftItemId/lock',
  verifyJwtMiddleware,
  NftItemController.lockNftItem
);
ItemRouter.patch(
  '/:nftItemId/unlock',
  verifyJwtMiddleware,
  NftItemController.unlockNftItem
);
ItemRouter.get('/:nftItemId', NftItemController.getNftItem);
ItemRouter.get('/:nftItemId', NftItemController.getNftItem);
ItemRouter.get('', NftItemController.getNftItems);

export default ItemRouter;
