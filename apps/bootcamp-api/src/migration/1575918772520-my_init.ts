import {MigrationInterface, QueryRunner} from "typeorm";

export class myInit1575918772520 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "firstName" character varying(300) NOT NULL, "lastName" character varying(300) NOT NULL, "email" character varying(300) NOT NULL, "pw" character varying(4096) NOT NULL, "pwSalt" character varying(4096) NOT NULL, "jwtToken" character varying(4096), "refreshToken" character varying(4096), "verified" boolean NOT NULL DEFAULT false, "roles" character varying array NOT NULL DEFAULT '{"user"}'::varchar[], "verification" character varying NOT NULL, "verificationExpires" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "loginAttempts" integer NOT NULL DEFAULT 0, "blockExpires" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IX_Account_Email" ON "account" ("email") `);
        await queryRunner.query(`CREATE INDEX "IX_Account_Token" ON "account" ("jwtToken") `);
        await queryRunner.query(`CREATE INDEX "IX_Account_RefreshToken" ON "account" ("refreshToken") `);
        await queryRunner.query(`CREATE TABLE "deck" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "userId" uuid NOT NULL, "version" integer NOT NULL, "title" character varying(300) NOT NULL, "showGroupId" bigint NOT NULL, "visibility" integer NOT NULL, "profit" integer NOT NULL, "rating" smallint NOT NULL, "rates" integer NOT NULL, "qaCorrectness" smallint NOT NULL, "interesting" smallint NOT NULL, "useful" smallint NOT NULL, "materialLevel" smallint NOT NULL, "questions" jsonb NOT NULL, "authorId" uuid, CONSTRAINT "PK_99f8010303acab0edf8e1df24f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_09e8a376bab70b9737c839b2e2" ON "deck" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IX_DeckBase_ShowGroupId" ON "deck" ("showGroupId") `);
        await queryRunner.query(`CREATE TABLE "answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "userId" uuid NOT NULL, "deck" uuid NOT NULL, "answers" jsonb NOT NULL, "deckId" uuid, "studentId" uuid, CONSTRAINT "REL_75bad7b49519d483c7b0b7f2b1" UNIQUE ("deckId"), CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5a26907efcd78a856c8af5829e" ON "answer" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2fdeaa16d8c6e29cffa78e36ed" ON "answer" ("deck") `);
        await queryRunner.query(`CREATE TABLE "forgot-password" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "email" character varying(300) NOT NULL, "verification" character varying(300) NOT NULL, "firstUsed" boolean NOT NULL DEFAULT false, "finalUsed" boolean NOT NULL DEFAULT false, "expires" date NOT NULL, "ip" character varying(300) NOT NULL, "browser" character varying(300) NOT NULL, "country" character varying(300) NOT NULL, "ipChanged" character varying(300), "browserChanged" character varying(300), "countryChanged" character varying(300), CONSTRAINT "PK_570315a38a033385cb84e2f7047" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh-token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "refreshToken" character varying(300) NOT NULL, "ip" character varying(300) NOT NULL, "browser" character varying(300) NOT NULL, "country" character varying(300) NOT NULL, CONSTRAINT "PK_62793706ec70c44e0bb5f448923" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "deck" ADD CONSTRAINT "FK_906348be74aae476c41bec3e74c" FOREIGN KEY ("authorId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_75bad7b49519d483c7b0b7f2b16" FOREIGN KEY ("deckId") REFERENCES "deck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_9d4daff8d1c25fef94b5f04cf54" FOREIGN KEY ("studentId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_9d4daff8d1c25fef94b5f04cf54"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_75bad7b49519d483c7b0b7f2b16"`);
        await queryRunner.query(`ALTER TABLE "deck" DROP CONSTRAINT "FK_906348be74aae476c41bec3e74c"`);
        await queryRunner.query(`DROP TABLE "refresh-token"`);
        await queryRunner.query(`DROP TABLE "forgot-password"`);
        await queryRunner.query(`DROP INDEX "IDX_2fdeaa16d8c6e29cffa78e36ed"`);
        await queryRunner.query(`DROP INDEX "IDX_5a26907efcd78a856c8af5829e"`);
        await queryRunner.query(`DROP TABLE "answer"`);
        await queryRunner.query(`DROP INDEX "IX_DeckBase_ShowGroupId"`);
        await queryRunner.query(`DROP INDEX "IDX_09e8a376bab70b9737c839b2e2"`);
        await queryRunner.query(`DROP TABLE "deck"`);
        await queryRunner.query(`DROP INDEX "IX_Account_RefreshToken"`);
        await queryRunner.query(`DROP INDEX "IX_Account_Token"`);
        await queryRunner.query(`DROP INDEX "IX_Account_Email"`);
        await queryRunner.query(`DROP TABLE "account"`);
    }

}
