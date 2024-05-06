import type { ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchAssets } from '$routes/api/services/careplan/assets/action-plan';
import { getAssetsType } from '$routes/api/services/careplan/assets/asset';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad  = async (event: ServerLoadEvent) => {
  const sessionId = event.cookies.get('sessionId');
  event.depends('app:careplan-assets');
  const userId = event.params.userId;
  console.log('sessionId', sessionId);
  const assetType = event.params.assetTypes;
    const response = await searchAssets(sessionId,'action-plans');
    const assets = response.Data;
    const assetTypes = await getAssetsType(sessionId);
    return {
      assets,
      assetTypes,
      sessionId
    };

};

/////////////////////////////////////////////////////////////////////////

