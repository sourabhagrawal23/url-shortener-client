import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';
import './Homepage.css';

class Homepage extends Component {
  state = {
    longUrl: '',
    shortUrl: '',
    copied: false,
    isError: false,
    errMessage: '',
    loading: false
  };

  onChange = e => {
    this.setState({
      longUrl: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ shortUrl: '', loading: true });
    console.log('submit url');
    axios
      .post('https://shrinktheurl.herokuapp.com/api/url/shorten', {
        longUrl: this.state.longUrl
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          shortUrl: res.data.shortUrl,
          longUrl: '',
          loading: false
        });
      })
      .catch(err => {
        // this.setState({ isError: true, errMessage: err });

        this.setState({ isError: true, loading: false });
        if (err.message === 'Network Error') {
          this.setState({
            errMessage:
              'Network Error :(   Make sure you are connected to the Internet.'
          });
        } else {
          this.setState({
            errMessage: 'Something went wrong, Check your URL.'
          });
        }
        setTimeout(() => {
          this.setState({ isError: false });
        }, 5000);
      });
  };

  onCopyUrl = () => {
    this.setState({ copied: true });
    setTimeout(() => {
      this.setState({ copied: false });
    }, 3000);
  };

  render() {
    const {
      shortUrl,
      longUrl,
      copied,
      errMessage,
      isError,
      loading
    } = this.state;
    return (
      <div className="homepage">
        <h1>
          <span>SHRINK</span> ME
        </h1>
        <div className="description">
          Simple and Clean UI. No registration required.
          <br />
          Use <span>URL Shortener</span> to easily shrink long URL
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            className="input"
            name="longUrl"
            onChange={this.onChange}
            value={longUrl}
            placeholder="Paste your long url here..."
            type="text"
            required
          />
          <button className="button" type="submit">
            <div>Short URL</div>
            <span>
              <i className="fas fa-cut" /> ---
            </span>
          </button>
        </form>

        {loading && <div className="description">Loading...</div>}

        {isError && <div className="description">{errMessage}</div>}

        {shortUrl.length > 1 && (
          <div>
            <div className="description">
              Here is your <span>shrinked</span> URL : )
            </div>
            <div id="shortUrl" className="shortUrl">
              {shortUrl}
              <CopyToClipboard text={shortUrl} onCopy={this.onCopyUrl}>
                <span title="Copy">
                  <i className="fas fa-copy" />
                </span>
              </CopyToClipboard>
            </div>
            {copied && <div className="description">Copied! </div>}
          </div>
        )}

        <footer className="description">
          Made with{' '}
          <span>
            <i className="fas fa-heart" />
          </span>{' '}
          by{' '}
          <a
            href="https://linkedin.com/in/sourabhkhs/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>Sourabh Agrawal </span>
          </a>
        </footer>
      </div>
    );
  }
}

export default Homepage;
