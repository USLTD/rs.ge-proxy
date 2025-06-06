export namespace EServicesAPI {
    export type Response<T> = {
        DATA: T;
        STATUS: {
            ID: number;
            TEXT: string;
        };
    };

    export namespace Users {
        export namespace Authenticate {
            /**
             * REQUEST პარამეტრები /Users/Authenticate
             */
            export type RequestBody = {
                /**
                 * მომხმარებლის სახელი ან პირადი ნომერი
                 */
                USERNAME: string;
                /**
                 * პაროლი
                 */
                PASSWORD: string;
                /**
                 * ორბიჯიანი ავტორიზაციის შემთხვევაში
                 * დამახსოვრებული მოწყობილობის კოდი GUID
                 * @optional
                 */
                DEVICE_CODE: string | null;
            };

            /**
             * RESPONSE პარამეტრები DATA ობიექტში ერთბიჯიანი ავტორიზაციისას
             */
            type ResponseOneStep = EServicesAPI.Response<{
                /**
                 * გასაღები
                 */
                ACCESS_TOKEN: string;
                /**
                 * ვადის გასვლის დრო (წამებში)
                 */
                EXPIRES_IN: number;
                /**
                 * დაფარული ტელეფონის ნომერი (ბოლო ორი ციფრი
                 * ჩანს) გამოიყენება ორბიჯიანი ავტორიზაციისას
                 * კოდის მიმღები ტელეფონის გამოსატანად
                 */
                MASKED_MOBILE: string;
            }>;

            /**
             * RESPONSE პარამეტრები DATA ობიექტში ორბიჯიანი ავტორიზაციისას
             */
            type ResponseTwoStep = EServicesAPI.Response<{
                /**
                 * დროებითი გასაღები
                 */
                PIN_TOKEN: string;
                /**
                 * დაფარული ტელეფონის ნომერი (ბოლო ორი ციფრი
                 * ჩანს) გამოიყენება ორბიჯიანი ავტორიზაციისას
                 * კოდის მიმღები ტელეფონის გამოსატანად
                 */
                MASKED_MOBILE: string;
            }>;

            export type Response = ResponseOneStep | ResponseTwoStep;
        }

        export namespace AuthenticatePin {
            /**
             * REQUEST პარამეტრები /Users/AuthenticatePin
             */
            export type RequestBody = {
                /**
                 * დროებითი გასაღები, რომელიც გიბრუნდებათ
                 * Authenticate-ის გამოძახებისას
                 */
                PIN_TOKEN: string;
                /**
                 * ტელეფონზე მოსული ოთხნიშნა ერთჯერადი კოდი
                 */
                PIN: string;
                /**
                 * ორბიჯიანი ავტორიზაციის შემთხვევაში
                 * დასამახსოვრებელი მოწყობილობის კოდი GUID
                 * @optional
                 */
                DEVICE_CODE: string | null;
                /**
                 * მისამართი, საიდანაც ხდება სისტემაში შესვლა
                 * @optional
                 */
                ADDRESS: string | null;
                /**
                 * ბროუზერი, რომლის გამოყენებითაც ხდება
                 * სისტემაში შესვლა
                 * @optional
                 */
                BROWSER: string | null;
                /**
                 * ოპერაციული სისტემა, რომელზეც გაშვებულია
                 * შესაბამისი პროგრამა თუ ბროუზერი
                 * @optional
                 */
                OPER_SYSTEM: string | null;
            };

            export type Response = EServicesAPI.Response<{
                /**
                 * გასაღები
                 */
                ACCESS_TOKEN: string;
                /**
                 * ვადის გასვლის დრო (წამებში)
                 */
                EXPIRES_IN: number;
            }>;
        }
    }
}
