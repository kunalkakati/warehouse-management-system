import * as z from "zod";

export const userLoginSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password should atleast 8 character long" })
    .max(64, { message: "Password cannot exceed 64 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[\W_]/, {
      message: "Password must contain at least one special character",
    }),
});

export const userRagistrationSchema = z.object({
  name: z.string().min(4, { message: "Name Should have at least 4 character" }),
  email: z.email(),
  officeAddress: z
    .string()
    .min(1, { message: "Office address can not be empty" }),
  employeeId: z.string().length(8, "Employee Id should be exacly 8 character"),
  role: z.enum(["user", "manager", "admin"], {
    message: "Please select a valid role",
  }),
  godownCode: z
    .string()
    .min(3, { message: "Code Should containe at least 3 character" })
    .max(40, { message: "Code shoud not be more then 40 character" }),
  password: z
    .string()
    .min(8, { message: "Password should atleast 8 character long" })
    .max(64, { message: "Password cannot exceed 64 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[\W_]/, {
      message: "Password must contain at least one special character",
    }),
});

export const employeeSearchSchema = z.object({
  eid: z.string().length(8, "Employee Id should be exacly 8 character"),
});
