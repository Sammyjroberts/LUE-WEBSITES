
    <!-- Page Content -->
    <div class="container">

        <!-- Page Heading/Breadcrumbs -->
        <p></p>
        <div class="row">
            <div class="col-lg-12">
                <h2 class="page-header">Contact Us

                </h2>
                <ol class="breadcrumb">
                    <li><a href="index.html">Home</a>
                    </li>
                    <li class="active">Contact</li>
                </ol>
            </div>
        </div>
        <!-- /.row -->

        <!-- Content Row -->
        <div class="row">
            <!-- Map Column -->
            <div class="col-md-8">
                <!-- Embedded Google Map -->
            <iframe width="100%" height="400px" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26556.525936909733!2d-117.87919682711448!3d33.69430698061019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcdec3f4688387%3A0xe462673955556be2!2s17762+Mitchell+N%2C+Irvine%2C+CA+92614!5e0!3m2!1sen!2sus!4v1450222872571"></iframe>
            </div>
            <!-- Contact Details Column -->
            <div class="col-md-4">
                <h3>Contact Details</h3>
                <p>
                    17762 Mitchell North, <b>Irvine CA 92614</b>
                </p>
                <p><i class="fa fa-phone"></i>
                    <abbr title="Phone">Phone</abbr>: (949) 536-3200</p>
                <p><i class="fa fa-fax"></i>
                    <abbr title="Fax">Fax</abbr>: (714) 535-5370</p>
                    <p><i class="fa fa-envelope-o"></i>

                    <abbr title="Email">Service Requests</abbr>: <a href="mailto:name@example.com">services@luelectricinc.com</a>

                </p>
                <p><i class="fa fa-envelope-o"></i>
                    <abbr title="Email">General</abbr>: <a href="mailto:name@example.com">luelectric@luelectricinc.com</a>
                </p>

                <p><i class="fa fa-clock-o"></i>
                    <abbr title="Hours">Hours</abbr>: Monday - Friday: 8:00 AM to 6:00 PM</p>

            </div>
        </div>
        <!-- /.row -->

        <!-- Contact Form -->
        <!-- In order to set the email address and subject line for the contact form go to the bin/contact_me.php file. -->
        <div class="row">
            <div class="col-md-8">
                <h3>Send us a Message</h3>
                <form name="sentMessage" id="contactForm" novalidate>
                    <div class="control-group form-group">
                        <div class="controls">
                            <label>Full Name:</label>
                            <input type="text" class="form-control" id="name" required data-validation-required-message="Please enter your name.">
                            <p class="help-block"></p>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <div class="controls">
                            <label>Phone Number:</label>
                            <input type="tel" class="form-control" id="phone" required data-validation-required-message="Please enter your phone number.">
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <div class="controls">
                            <label>Email Address:</label>
                            <input type="email" class="form-control" id="email" required data-validation-required-message="Please enter your email address.">
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <div class="controls">
                            <label>Message:</label>
                            <textarea rows="10" cols="100" class="form-control" id="message" required data-validation-required-message="Please enter your message" maxlength="999" style="resize:none"></textarea>
                        </div>
                    </div>
                    <div id="success"></div>
                    <!-- For success/fail messages -->
                    <button type="submit" class="btn btn-primary">Send Message</button>
                </form>
            </div>

        </div>
        <!-- /.row -->

        <hr>

        <!-- Footer -->

    </div>
