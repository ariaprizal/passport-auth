
import { expect } from "chai";
import {db} from "../../models/index.mjs";
import { restore, stub } from "sinon";
import { destroy, findAllUser, update } from "../repository/user.repository.mjs";
import { describe } from "mocha";
import {} from "chai-http";

const User = db.User;

describe("User Service Unit Tests", function () {
  this.afterEach(() => {
    restore();
  });

  describe("Get All User functionality", function () {
    it("should return correct all data in record", async function () {
      const fakeData = {
        id: 1,
        firstName: "Dum",
        lastName: "Dummy",
        userName: "dummy",
        password: "dummyPassword"
      }
      stub(User, 'findAll').returns(fakeData)
      const result = await findAllUser();

      expect(result.firstName).to.equal(fakeData.firstName)
      expect(result.userName).to.equal(fakeData.userName)
      expect(result.password).to.eql(fakeData.password)
    });

    it("should give error if data is empty", async function () {
      stub(User, 'findAll').returns(null);
      await findAllUser().catch((error) => {
        expect(error.message).to.equal("User data is empty");
      });
    });
  });

  describe("Update user data", function () {
    it("should return success true", async function () {
      stub(User, "update").returns([1]);
      const fakeData = { userName: "dummy" };
      const id = 1;
      const result = await update(fakeData, id);

      expect(result.success).to.equal(true);
      expect(result.message).to.equal(null);
    });

    it("should return success false", async function () {
      const response = {
        "success": false,
        "message": null,
      };
      
      stub(User, "update").returns([0]);
      const fakeData = { userName: "dummy" };
      const id = 1;
      const result = await update(fakeData, id);

      expect(result.success).to.equal(response.success);
      expect(result.message).to.equal(response.message);
    });
  });

  describe("delete User by id", function () {
    it("should be return status 200", async function () {
      stub(User, "destroy").returns(200);
      const id = 1;
      const result = await destroy(id);

      expect(result).to.equal(200);
    })


    it("should be return status 400", async function () {
      stub(User, "destroy").returns(400);
      const id = 1;
      const result = await destroy(id);

      expect(result).to.equal(400);
    })
  });


});
  