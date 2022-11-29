import { app } from "./controller/app";
import { accountRouter } from "./router/accountRouter";
import { transactionRouter } from "./router/transactionRouter";
import { userRouter } from "./router/userRouter";

app.use("/user", userRouter);
app.use("/transaction", transactionRouter);
app.use("/account", accountRouter);
