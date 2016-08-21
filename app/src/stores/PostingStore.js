import { autorun, observable, computed, action, transaction, toJS } from 'mobx';

class PostingStore {
  @observable postings = [];
  @observable activePosting = null;

  constructor(databaseRef, storageRef) {
    this.storageRef = storageRef;

    databaseRef.orderByChild('createdAt').limitToLast(100).on('value', snapshot => {
      const val = snapshot.val();
      // console.log('SNAPSHOP:', val);

      Object.keys(val).forEach(key => {
        let posting = val[key];
        posting.id = key;
        posting.imageUrl = null;
        this.postings.push(val[key]);
      });

      // console.log('POSTINGS:', toJS(this.postings));
    });

    autorun(() => {
      if (this.activePosting) {
        this.storageRef.child(this.activePosting.imageId).getDownloadURL().then(url => {
          this.activePosting.imageUrl = url;
        }).catch(error => {
          this.activePosting.imageUrl = null;
        });
      }
    });
  }

  findById(id) {
    return this.postings.find(posting => posting.id === id);
  }
}

export default PostingStore;
