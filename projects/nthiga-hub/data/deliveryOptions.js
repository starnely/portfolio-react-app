// ============================================================
// PURPOSE: Define the available delivery speeds and prices,
//          and provide a way to look up a specific option.
//============================================================
export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
}, {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
}, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];

// ============================================================
// STEP 2: getDeliveryOption() — Find one option by its ID and provide a way to look up a specific option.
//This function searches through deliveryOptions[].
//============================================================
export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    // Search every option for a matching id
    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });

    // Return the found option, or standard shipping as a safe fallback
    return deliveryOption || deliveryOptions[0];
}