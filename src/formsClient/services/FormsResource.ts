/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FormDto } from '../models/FormDto';
import type { FormEntryDto } from '../models/FormEntryDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FormsResource {
    /**
     * @returns FormDto OK
     * @throws ApiError
     */
    public static getUmbracoFormsDeliveryApiV1Definitions({
        id,
        contentId,
        culture,
        additionalData,
    }: {
        /**
         * The form's Id.
         */
        id: string,
        /**
         * The Id of the content page on which the form is hosted.
         */
        contentId?: string,
        /**
         * The culture code for the form's localization context.
         */
        culture?: string,
        /**
         * Additional data provided when rendering the form.
         */
        additionalData?: Record<string, string>,
    }): CancelablePromise<FormDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/umbraco/forms/delivery/api/v1/definitions/{id}',
            path: {
                'id': id,
            },
            query: {
                'contentId': contentId,
                'culture': culture,
                'additionalData': additionalData,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }
    /**
     * @returns string Accepted
     * @throws ApiError
     */
    public static postUmbracoFormsDeliveryApiV1Entries({
        id,
        requestBody,
    }: {
        /**
         * The form's Id.
         */
        id: string,
        requestBody?: FormEntryDto,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/umbraco/forms/delivery/api/v1/entries/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            responseHeader: 'Umb-Notifications',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                422: `Unprocessable Content`,
            },
        });
    }
}
