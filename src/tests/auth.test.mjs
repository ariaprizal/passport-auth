import { expect } from "chai";
import {db} from "../../models/index.mjs";
import { restore, stub } from "sinon";
import { findByUserName, updateAccessToken } from "../repository/user.repository.mjs";
import { describe } from "mocha";
import { } from "chai-http";
const User = db.User;


describe("user auth test", function () {
    this.afterEach(() => {
        restore();
    });
    
    describe('login functionality', function () {
        it('should be return success login', async function () {
            const fakeData = {
                userName: "user",
                password: '1@A23456'
            };

            const response = {
                status: 200,
                message: 'success login',
                access_token: "ACCESS TOKEN"
            };

            stub(User, 'findOne').returns(response);
            const result = await findByUserName(fakeData.userName);

            expect(result.status).to.equal(response.status);
            expect(result.message).to.equal(response.message);
            expect(result.access_token).to.equal(response.access_token);
        });

        it('should be return user not found', async function () {
            const fakeData = {
                userName: "user",
                password: '1@A23456'
            };

            const response = {
                "status": 400,
                "message": `USERNAME NOT FOUND`
            }

            stub(User, 'findOne').returns(response);
            const result = await findByUserName(fakeData.userName);

            expect(result.status).to.equal(response.status);
            expect(result.message).to.equal(response.message);
            expect(result.access_token).to.equal(response.access_token);

        });

        it('should be return password not match', async function () {
            const fakeData = {
                userName: "user",
                password: '1@A23456'
            };

            const response = {
                "status": 400,
                "message": `PASSWORD NOT MATCH`
            };

            stub(User, 'findOne').returns(response);
            const result = await findByUserName(fakeData.userName);

            expect(result.status).to.equal(response.status);
            expect(result.message).to.equal(response.message);
            expect(result.access_token).to.equal(response.access_token);

        });

        it('update access token should be return success true', async function () {
            const fakeData = {
                access_token: "ACCESSTOKEN"
            };
            const id = 1;

            const response = {
                "success": true,
                "message": null
            };

            stub(User, 'update').returns([1]);
            const result = await updateAccessToken(fakeData, id);

            expect(result.success).to.equal(response.success);
            expect(result.message).to.equal(response.message);

        });

        it('update access token should be return success false', async function () {
            const fakeData = {
                access_token: "ACCESSTOKEN"
            };
            const id = 1;
            const response = {
                "success": false,
                "message": null
            };

            stub(User, 'update').returns([0]);
            const result = await updateAccessToken(fakeData, id);

            expect(result.success).to.equal(response.success);
            expect(result.message).to.equal(response.message);
        });
    });

});