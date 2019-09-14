import { NodesController } from "../controllers/nodes.controller";
import { LinksController } from "../controllers/links.controller";
import { UsersController } from "../controllers/user.controller";
import { GraphController } from "../controllers/graph.controller";
import { AuthController } from "../controllers/auth.controller";
import { checkJwt } from "../middlewares/checkJwt";

export class Routes {
  public nodesController: NodesController = new NodesController();
  public linksController: LinksController = new LinksController();
  public usersController: UsersController = new UsersController();
  public graphController: GraphController = new GraphController();
  public authController: AuthController = new AuthController();

  public routes(app): void {

    //Node
    app.route("/nodes")
       .get([checkJwt],this.nodesController.index)
       .post([checkJwt],this.nodesController.create);

    app.route("/nodes/:id")
       .get([checkJwt],this.nodesController.show)
       .put([checkJwt],this.nodesController.update)
       .delete([checkJwt],this.nodesController.delete);

    //Links
    app
       .route("/links")
       .get([checkJwt],this.linksController.index)
       .post([checkJwt],this.linksController.create);

    app
       .route("/links/:id")
       .get([checkJwt],this.linksController.show)
       .put([checkJwt],this.linksController.update)
       .delete([checkJwt],this.linksController.delete);

   //Users
   app
       .route("/users")
       .get([checkJwt],this.usersController.index)
       .post([checkJwt],this.usersController.create);
 
   app
       .route("/users/:id")
       .get([checkJwt],this.usersController.show)
       .put([checkJwt],this.usersController.update)
       .delete([checkJwt],this.usersController.delete);   

    //Graph
    app.route("/")
       .get([checkJwt],this.graphController.mermaid);
   
   //Login
   app.route("/login")
       .post(this.authController.login);
  }
}