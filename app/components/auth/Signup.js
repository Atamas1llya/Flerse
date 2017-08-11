import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

import DemoHeader from '../Header';
import { signup, checkEmail, checkNickname } from '../../actions/auth';
import { validate } from 'email-validator';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      nickname: false,
      email: false,
      password: false,
      timeout: () => {}
    }
    this.getCredentials = this.getCredentials.bind(this);
    this.checkNickname = this.checkNickname.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.register = this.register.bind(this);
  }

  checkNickname() {
    clearTimeout(this.state.timeout);
    this.setState({
      nickname: false
    })

    const nickname = document.getElementById('signup-nickname').value;
    if (!nickname) {
      this.setState({
        nickname: false
      })
    } else {
      checkNickname(nickname)
        .then(uniqueness => {

          this.setState({
            timeout: setTimeout(() => {
              this.setState({
                nickname: uniqueness ? 'О, мне уже нравится!' : 'Хм.. Знакомое имя.. Но это не Вы',
                nicknameStatus: uniqueness
              })
            }, 1000)
          })

        })
    }
  }

  checkEmail() {
    clearTimeout(this.state.timeout);
    const email = document.getElementById('signup-email').value;

    if (!email) {
      this.setState({
        email: false
      })
    } else if (!validate(email)) {
      this.setState({
        timeout: setTimeout(() => {
          this.setState({
            email: 'Хм.. Что-то здесь не так',
            emailStatus: false
          })
        }, 1000)
      })

    } else {
      checkEmail(email)
        .then(uniqueness => {

          this.setState({
            timeout: setTimeout(() => {
              this.setState({
                email: uniqueness ? 'Спасибо, обещаю не спамить' : 'Хм.. Что-то здесь не так',
                emailStatus: uniqueness
              })
            }, 1000)
          })

        })
    }
  }

  checkPassword() {
    clearTimeout(this.state.timeout);
    const password = document.getElementById('signup-password').value;
    if (password.length >= 6) {
      this.setState({
        timeout: setTimeout(() => {
          this.setState({
            password: 'Великолепный пароль! Ой...',
            passwordStatus: true
          })
        }, 1000)
      })
    } else {
      this.setState({
        timeout: setTimeout(() => {
          this.setState({
            password: '(сообщение о том что пароль плох)',
            passwordStatus: false
          })
        }, 1000)
      })
    }
  }

  getCredentials() {
    return {
      nickname: document.getElementById('signup-nickname').value,
      email: document.getElementById('signup-email').value,
      password: document.getElementById('signup-password').value
    }
  }

  register(e) {
    e.preventDefault();

    const credentials = this.getCredentials();
    this.props.signup(credentials);
  }

  render() {
    const { nicknameStatus, nickname, emailStatus, email, passwordStatus, password } = this.state;

    return(
      <div id="signup">
        <DemoHeader />
        <main>
          <Grid className='grid'>
            <Row className="show-grid">
              <Col xs={0} md={3} />
              <Col xs={12} md={6}>
                <form onSubmit={this.register}>

                  <section className="fadeInUp animated">
                    <h4>Здравствуйте. Давайте познакомимся.</h4>

                    <FormGroup>
                      <FormControl id="signup-nickname" placeholder="Меня зовут Flerse, а Вас?" required onChange={ this.checkNickname } />
                    </FormGroup>
                  </section>

                  {
                    nickname
                    ? <section className="fadeIn animated">
                        <p>{ nickname }</p>
                        {
                          nicknameStatus
                          ? <FormGroup>
                              <FormControl id="signup-email" className="fadeInUp animated" placeholder="Почту, пожалуйста" required onChange={ this.checkEmail } />
                            </FormGroup>
                          : null
                        }
                      </section>
                    : null
                  }

                  {
                    email
                    ? <section className="fadeIn animated">
                      <p>
                        { email }
                      </p>
                      {
                        emailStatus
                        ? <FormGroup>
                            <FormControl id="signup-password" className="fadeInUp animated" placeholder="Создаем пароль. Я не подсматриваю" type="password" required onChange={ this.checkPassword } />
                          </FormGroup>
                        : null
                      }
                    </section>
                    : null
                  }

                  {
                    password
                    ? <section className="fadeIn animated">
                        <p>{ password }</p>

                      {
                        passwordStatus
                        ? <div>
                            <p>Супер! Продолжим?</p>
                            <Button type="submit" className="fadeInUp animated">Вперёд!</Button>
                          </div>
                        : null
                      }
                     </section>
                    : null
                  }

                </form>
              </Col>
              <Col xs={0} md={3} />
            </Row>
          </Grid>
        </main>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  signup: credentials => dispatch(signup(credentials))
});

export default connect(false, mapDispatch)(Signup);
