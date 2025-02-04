import { writeFile } from 'node:fs/promises';
import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { PUBLIC_LOCAL_STORAGE } from '$env/static/public';
import * as fs from 'fs';
import { importCareplan } from '$routes/api/services/careplan/careplans.js';

export const actions = {
    importCareplan: async (event: RequestEvent) => {
        const userId = event.params.userId;
        const request = event.request;
        const sessionId = event.cookies.get('sessionId');
        const formData = await request.formData();
        const uploadedFile = formData?.get('file') as File;
        const fileName = uploadedFile.name;
        const fileUploadFolder = PUBLIC_LOCAL_STORAGE;
        // const filePath = `${fileUploadFolder}/${fileName}`;
        // const filename = file.name;
			// const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer()).buffer;
			// console.log('File buffer length:', fileBuffer);
            const filePath = `${fileUploadFolder}/${fileName}`;
			// fs.writeFile(filePath, fileBuffer);

        if (!fs.existsSync(`${fileUploadFolder}`)) {
            fs.mkdirSync(`${fileUploadFolder}`, { recursive: true });
        }
        // const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
		// 	fs.writeFileSync(filePath, fileBuffer);

        // const arrayBuffer = await uploadedFile.arrayBuffer();
        // await writeFile(filePath, new Uint8Array(arrayBuffer));
    

        // const arrayBuffer = await uploadedFile.arrayBuffer();
        // const buffer = Buffer.from(arrayBuffer);
        // await writeFile(filePath, buffer);
        const arrayBuffer = await uploadedFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        await writeFile(filePath, uint8Array);

        if (!fs.existsSync(filePath)) {
            console.log('File not created');
            throw redirect(
                303,
                `/users/${userId}/careplan/careplans`,
                errorMessage('Unable to import careplan.'),
                event
            );
        }

        const response = await importCareplan(sessionId, fileName, filePath);

        fs.unlinkSync(filePath);

        if (response.Status === 'failure' || response.HttpCode !== 200) {
            console.log(`Error in import careplan: ${response.Message}`);
            throw redirect(303, `/users/${userId}/careplan/careplans`, errorMessage('Error in import careplan'), event);
        }
        throw redirect(303, `/users/${userId}/careplan/careplans`, successMessage(response.Message), event);
    }
};
