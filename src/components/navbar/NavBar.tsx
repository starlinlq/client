import react from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/stores";

function NavBar() {
  const { user } = useStore();
  const { isAuth } = user;
  return (
    <Menu pointing secondary widths="five">
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          <h4 style={{ marginRight: "10px" }}> SHARE</h4>
        </Menu.Item>
        <Menu.Item as={NavLink} to="/activities" name="stories" />
        <Menu.Item as={NavLink} to="/test" name="testing" />
        {isAuth ? (
          <>
            <Menu.Item>
              <Button
                floated="right"
                as={NavLink}
                to="createActivity"
                color="black"
                content="Create Activity"
              />
            </Menu.Item>
            <Menu.Item>
              <Button
                floated="right"
                as={NavLink}
                to="/profile"
                content="profile"
                color="black"
              />
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item>
              {" "}
              <Button as={NavLink} to="/register" content="register" />{" "}
            </Menu.Item>
            <Menu.Item>
              {" "}
              <Button
                as={NavLink}
                secondary
                to="/login"
                primary
                content="log in"
              />{" "}
            </Menu.Item>
          </>
        )}
      </Container>
    </Menu>
  );
}

export default observer(NavBar);
