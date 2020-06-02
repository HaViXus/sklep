import React, {  useState } from 'react';

const RegisterPage = () => {
    return(
        <div class="container register-form">
            <div class="form">
                <div class="note">
                    <p>Join to us and buy best products in all universe!</p>
                </div>

                <div class="form-content">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Your Name *" />
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Phone Number *" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Your Password *" />
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Confirm Password *" />
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-success">Submit</button>
                </div>
            </div>
        </div>
            
    );
}

export default RegisterPage;