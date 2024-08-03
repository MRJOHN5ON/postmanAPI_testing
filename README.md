*This summary outlines the testing of the Urban Grocers API, focusing on:*

1. Adding products to a kit.
2. Calculations for fast delivery.

***A total of 57 tests were conducted: 28 for the first requirement and 29 for the second.***

(👇 Full test case data sheet available 👇)

[Google Sheets Test Case Data](https://docs.google.com/spreadsheets/d/1u7IGVb-FNyHqHK7GsBrwKLk84MCGCfISmwzFId9o3K0/edit?usp=drivesdk)

# Requirement 1: Adding Products to a Kit

![Adding Products to a Kit](https://file.notion.so/f/f/faada197-3f00-4085-a2c7-f628f29ece6f/4f105270-9919-4480-be51-126afe228ef3/Screen_Shot_2024-06-21_at_4.42.53_PM.png?table=block&id=6816949e-afdd-4913-b33b-c1595804ec94&spaceId=faada197-3f00-4085-a2c7-f628f29ece6f&expirationTimestamp=1722801600000&signature=DK17RnPGOPtQrlCUoUczXgz9FgZBQH4-pNQ_Lvkpnpc&downloadName=Screen+Shot+2024-06-21+at+4.42.53+PM.png)

## Key Findings

- **Total Tests**: 28
- **Parameters**: Tested scenarios around the 30-item limit, invalid product IDs, and kit IDs.

## Major Bugs

### **Exceeding 30 Items**

- The API incorrectly allowed multiple quantities of the same product to be added to a kit, causing it to exceed the 30-item limit (expected HTTP 400, received HTTP 200).
- Interestingly, when adding multiple different products, each with a single quantity, to a kit that had under 30 items (causing it to exceed 30), the API behaved correctly and returned HTTP 400.
- **Example of the bug in Postman**

    ![Exceeding 30 Items](https://file.notion.so/f/f/faada197-3f00-4085-a2c7-f628f29ece6f/4fd8f14d-840f-4f4c-be52-f9c06f2d2fdf/Screen_Shot_2024-06-21_at_4.53.46_PM.png?table=block&id=e6bdefd0-dc2b-4abf-914d-a8a0c9b55da9&spaceId=faada197-3f00-4085-a2c7-f628f29ece6f&expirationTimestamp=1722801600000&signature=ZHruC5Px_axJnpiZuRAM1yjzE-K-CWHA7dOoNNJZHoE&downloadName=Screen+Shot+2024-06-21+at+4.53.46+PM.png)
    
- **Bug Report in JIRA**

    ![Bug Report in JIRA](https://file.notion.so/f/f/faada197-3f00-4085-a2c7-f628f29ece6f/5b98ed85-932a-4fec-82eb-34122d3ac7e8/Screen_Shot_2024-06-21_at_4.58.39_PM.png?table=block&id=45ca1f30-84d9-42ab-9439-bde744b4349f&spaceId=faada197-3f00-4085-a2c7-f628f29ece6f&expirationTimestamp=1722801600000&signature=i_1kRUE7JWD32yD--EBBzOU5Vx5D4rSiYMjvw1wIthE&downloadName=Screen+Shot+2024-06-21+at+4.58.39+PM.png)
    

### **Non-existent Product IDs**

- The system accepted non-existent product IDs (e.g., product ID 407 which does not exist) and responded with HTTP 200 OK instead of the expected HTTP 400 Bad Request.
- This could lead to users believing they have successfully added a valid product to their kit when, in fact, the product does not exist in the system.
- **Example of the bug in Postman**

    ![Non-existent Product IDs](https://file.notion.so/f/f/faada197-3f00-4085-a2c7-f628f29ece6f/fa29c4d3-f244-4295-963d-417b28dca26a/Screen_Shot_2024-06-21_at_5.02.42_PM.png?table=block&id=ff83a7f7-b565-4933-baa6-c86b75fd9bc6&spaceId=faada197-3f00-4085-a2c7-f628f29ece6f&expirationTimestamp=1722801600000&signature=OSEw4PahjwJT6Q4TpARMopY1BczCKmNgXWp5ABdezTE&downloadName=Screen+Shot+2024-06-21+at+5.02.42+PM.png)
    
- **Bug Report in JIRA**

    ![Bug Report in JIRA](https://file.notion.so/f/f/faada197-3f00-4085-a2c7-f628f29ece6f/7b8bf11f-1ffb-417a-b5cd-028c5bac2342/Screen_Shot_2024-06-21_at_5.05.01_PM.png?table=block&id=6884b0d0-9b7f-413c-b721-8628500dad3b&spaceId=faada197-3f00-4085-a2c7-f628f29ece6f&expirationTimestamp=1722801600000&signature=tHn74n1dSZ5I2xBODQISX49TG2SeVmyVnP4DEeGc12A&downloadName=Screen+Shot+2024-06-21+at+5.05.01+PM.png)
    

### **Invalid Inputs**

- The system was tested with various invalid product IDs and kit IDs (e.g., using Latin letters, symbols, decimal points, non-Latin letters).
- All these attempts resulted in HTTP 500 Internal Server Error, which indicates a server-side issue rather than a client error. According to the API documentation, the expected response should have been HTTP 400 Bad Request.

# Requirement 2: Fast Delivery Calculations

## Test Cases Overview

- **Total Tests**: 29
- **Focus**: Parameters for the fast delivery method.

> **Note**: While many more test cases could be designed given the different variables and combinations of product count and weight, I optimized by testing edge cases. For full reliability and adherence to the requirement, automation testing is recommended.

## Requirements and Calculations

[Detailed Requirements PDF](https://practicum-content.s3.us-west-1.amazonaws.com/qa-us/pdf/Requirements_Shipping_Price_Calculations.pdf)

### **Host Delivery Cost**

- **Definition**: The price the API charges the internal system for delivery.
- **Calculation**:
    - Based on either the number of products or their total weight, whichever results in the higher cost.
    - **Examples**:
        - If `productsCount` is 1-7 and `productsWeight` is 0-2.5 kg, the host delivery cost is $3.
        - If `productsCount` is 8-14 or `productsWeight` is 2.6-6 kg, the host delivery cost is $6.
    - Default cost: $7 if conditions do not match specified criteria.

### **Client Delivery Cost**

- **Definition**: The price charged to the customer for delivery.
- **Calculation**:
    - **Standard Cost**: $0 if the order meets the defined limits for product count and weight.
    - **Excess Cost**: $9 if the order exceeds the maximum limits for product count or weight.
    - **Examples**:
        - Within limits (e.g., 1-7 products, 0-2.5 kg): $0
        - Exceeding limits (e.g., more than 14 products or more than 6 kg): $9

# Test Scenarios

1. **Valid Middle-Ground Input**:
    - Tested the system with valid, middle-range parameters to ensure basic functionality.
2. **Minimal Product Weight and Middle Values for Other Parameters**:
    - Ensured the system accepted orders with minimal weight and middle-range product counts and delivery times.
3. **Minimal Product Weight and Count**:
    - Verified that the client delivery cost remained $0 for orders with minimal weight and product count within limits.
4. **Product Weight Exceeding Maximum Limit**:
    - **Scenario**: Tested fast delivery with product count within limits but weight slightly over the limit (6.01 kg).
    - **Expected**: Host delivery cost $6, client delivery cost $9.
    - **Observed**: Client delivery cost was incorrectly charged $6 instead of $9.
    - **Bug**: The system failed to apply the excess client delivery cost correctly when the product weight exceeded the maximum limit.
5. **Product Count Exceeding Maximum Limit**:
    - **Scenario**: Tested fast delivery with weight within limits but product count slightly over the limit.
    - **Expected**: Host delivery cost $6, client delivery cost $9.
    - **Observed**: Client delivery cost was incorrectly charged $6 instead of $9.
    - **Bug:** The system failed to apply the excess client delivery cost correctly when the product count exceeded the maximum limit.
6. **Operating Hours Edge Cases**:
    - **Scenario**: Tested ordering one minute before operating hours (06:59).
        - **Expected**: `isItPossibleToDeliver` should be `false`.
        - **Observed**: `isItPossibleToDeliver` was `true`.
        - **Bug**: The system incorrectly allowed orders one minute before operating hours.
    - **Scenario**: Tested ordering one minute after operating hours (21:01).
        - **Expected**: `isItPossibleToDeliver` should be `false`.
        - **Observed**: `isItPossibleToDeliver` was `true`.
        - **Bug**: The system incorrectly allowed orders one minute after operating hours.

# Inconclusive Tests

During testing for Requirement Two, two tests were deemed inconclusive, pointing to a significant flaw in the design of the API's cost calculation system. These tests highlighted a gap in the defined ranges for host delivery cost:

1. **Ordering Fast Delivery with Product Weight Just Above the Lower Limit (2.51 kg)**
    - **Expected Result**: Host delivery cost unknown due to gap in defined ranges.
    - **Observed Result**:

    ```xml
    200 OK
    <response name="Fast Delivery" isItPossibleToDeliver="true" hostDeliveryCost="3" clientDeliveryCost="0">
        <toBeDeliveredTime>
            <min>25</min>
            <max>30</max>
        </toBeDeliveredTime>
    </response>
    ```

2. **Ordering Fast Delivery with Product Weight Slightly Below the Upper Limit (2.59 kg)**
    - **Expected Result**: Host delivery cost unknown due to gap in defined ranges.
    - **Observed Result**:

    ```xml
    200 OK
    <response name="Fast Delivery" isItPossibleToDeliver="true" hostDeliveryCost="3" clientDeliveryCost="0">
        <toBeDeliveredTime>
            <min>25</min>
            <max>30</max>
        </toBeDeliveredTime>
    </response>
    ```

## Major Flaw in Design

**Host Delivery Cost Gap**: The current requirements have a gap between the $3 price range (0-2.5 kg) and the $6 price range (2.6-6 kg). 
This ambiguity creates uncertainty in expected outcomes for product weights that fall within this gap (e.g., 2.51 kg and 2.59 kg).
