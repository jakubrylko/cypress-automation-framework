@regression
Feature: WebDriverUni Login Page

    # Scenario: Login using valid credentials
    #     Given I access the WebDriverUni Login Portal page
    #     When I enter a username webdriver
    #     And I enter password webdriver123
    #     And I click on the login button
    #     Then I should be presented with the following message validation succeeded

    # Scenario: Login using invalid credentials
    #     Given I access the WebDriverUni Login Portal page
    #     When I enter a username mandriver
    #     And I enter password webdriver777
    #     And I click on the login button
    #     Then I should be presented with the following message validation failed

    @login
    Scenario Outline: Test Login via WebDriverUni Login Portal
        Given I access the WebDriverUni Login Portal page
        When I enter a username <userName>
        And I enter password <password>
        And I click on the login button
        Then I should be presented with the following message <message>

        Examples:
            | userName  | password     | message              |
            | webdriver | webdriver123 | validation succeeded |
            | webdriver | webdriver777 | validation failed    |
            | mandriver | webdriver123 | validation failed    |