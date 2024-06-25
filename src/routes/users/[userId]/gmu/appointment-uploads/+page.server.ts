import { writeFile } from 'node:fs/promises';
import { uploadAppoinmentPdf } from "../../../../api/services/gmu/appointment-upload";
import type { RequestEvent } from "@sveltejs/kit";
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { Helper } from '$lib/utils/helper';
import type {PageServerLoad } from './$types';
import { Buffer } from "buffer";
import * as fs from 'fs';
export const load:PageServerLoad = ({depends}) => {
    depends('app:appointment-upload');
}
export const actions = {
	uploadAppoinment: async (event: RequestEvent) => {
        // const userId = event.params.userId;
		const request = event.request;
		// const sessionId = event.cookies.get('sessionId');
		const formData = await request.formData();
		const uploadedFile = formData?.get('name') as File;
		const fileName = uploadedFile.name;
        const newFileName = Helper.replaceAll(fileName, ' ', '_');
		const filePath = `./temp/${newFileName}`;

        console.log(uploadedFile)
		if (!fs.existsSync('./temp')) {
			fs.mkdirSync('./temp', { recursive: true });
		  }

		await writeFile(filePath, Buffer.from(await uploadedFile?.arrayBuffer()));

		if (!fs.existsSync(filePath)) {
			console.log('File not created');
			throw redirect(303, `/open/appointment-uploads`, errorMessage('Unable to import appointment template.'), event);
		}

		const response = await uploadAppoinmentPdf(
            newFileName,
			filePath
		);

		fs.unlinkSync(filePath);
		console.log('&&&&&&',response)
		if (!response.body.success || response.status !== 200) {
            return {
                Status: 'failure',
                Message: response.body.message
            }
		}
	    return {
            Status: 'success',
            Message: response.body.message
        }


	}
}
